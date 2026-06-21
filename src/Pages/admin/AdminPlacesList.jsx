import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AdminLayout from "../../components/admin/AdminLayout";
import { usePlacesStore } from "../../components/hooks/PlacesDataContext";

const AdminPlacesList = () => {
  const navigate = useNavigate()
  const { places, deletePlace } = usePlacesStore()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const categories = ['All', 'Heritage', 'Nature', 'Adventure', 'Religious', 'Culture']

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.stateName.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter
      return matchSearch && matchCategory
    })
  }, [places, search, categoryFilter])

  const confirmDelete = () => {
    if (deleteTarget) {
      deletePlace(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">All Places</h1>
            <p className="text-gray-500 text-sm mt-1">{places.length} destinations in total</p>
          </div>
          <button
            onClick={() => navigate('/admin/places/new')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm"
          >
            <i className="ri-add-line text-lg"></i> Add New Place
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by place name or state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white text-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="text-left px-5 py-3 font-semibold">Place</th>
                    <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">State</th>
                    <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Category</th>
                    <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Rating</th>
                    <th className="text-right px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((place) => (
                    <tr key={place.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=100&q=80" }}
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{place.name}</p>
                            <p className="text-gray-400 text-xs md:hidden">{place.stateName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{place.stateName}</td>
                      <td className="px-5 py-3 hidden lg:table-cell">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-50 text-orange-600">
                          {place.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-gray-700">
                          <i className="ri-star-fill text-yellow-400 text-xs"></i> {place.rating}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/place/${place.id}`)}
                            title="View on site"
                            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"
                          >
                            <i className="ri-eye-line text-sm"></i>
                          </button>
                          <button
                            onClick={() => navigate(`/admin/places/edit/${place.id}`)}
                            title="Edit"
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"
                          >
                            <i className="ri-edit-line text-sm"></i>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(place)}
                            title="Delete"
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">🗺️</div>
              <p className="text-gray-500 font-semibold">No places found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different search or filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-5">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <i className="ri-error-warning-line text-2xl"></i>
            </div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-2">Delete this place?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-700">{deleteTarget.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminPlacesList