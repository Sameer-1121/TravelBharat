import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AdminLayout from "../../components/admin/AdminLayout";
import { usePlacesStore } from "../../components/hooks/PlacesDataContext";

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { places, statesInfo } = usePlacesStore()

  const totalPlaces = places.length
  const totalStates = new Set(places.map((p) => p.state)).size
  const categories = ["Heritage", "Nature", "Adventure", "Religious", "Culture"]
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: places.filter((p) => p.category === cat).length,
  }))

  const recentPlaces = [...places].slice(-5).reverse()

  const stats = [
    { icon: "ri-map-pin-2-fill",  label: "Total Places", value: totalPlaces, color: "bg-orange-50 text-orange-500" },
    { icon: "ri-building-4-fill", label: "States Covered", value: totalStates, color: "bg-blue-50 text-blue-500"   },
    { icon: "ri-apps-2-fill",     label: "Categories",   value: categories.length, color: "bg-purple-50 text-purple-500" },
    { icon: "ri-database-2-fill", label: "Storage",      value: "Local",     color: "bg-green-50 text-green-500" },
  ]

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your content.</p>
          </div>
          <button
            onClick={() => navigate('/admin/places/new')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm"
          >
            <i className="ri-add-line text-lg"></i> Add New Place
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Category Breakdown */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Places by Category</h2>
            <div className="space-y-3">
              {categoryCounts.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{cat.name}</span>
                    <span className="text-gray-400">{cat.count}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: totalPlaces ? `${(cat.count / totalPlaces) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Places */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Recently Added</h2>
              <button onClick={() => navigate('/admin/places')} className="text-orange-500 text-sm font-semibold hover:text-orange-600">
                View All →
              </button>
            </div>

            {recentPlaces.length > 0 ? (
              <div className="space-y-3">
                {recentPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => navigate(`/admin/places/edit/${place.id}`)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=80" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{place.name}</p>
                      <p className="text-gray-500 text-xs">{place.stateName} • {place.category}</p>
                    </div>
                    <i className="ri-arrow-right-s-line text-gray-400 text-xl"></i>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-8">No places added yet.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard