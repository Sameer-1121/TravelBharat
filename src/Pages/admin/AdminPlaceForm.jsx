import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AdminLayout from "../../components/admin/AdminLayout";
import { usePlacesStore } from "../../components/hooks/PlacesDataContext";

const emptyForm = {
  id: '',
  name: '',
  state: '',
  stateName: '',
  city: '',
  category: 'Heritage',
  rating: 4.5,
  description: '',
  bestTime: '',
  entryFee: '',
  timings: '',
  image: '',
  nearbyPlaces: '',
}

const categories = ['Heritage', 'Nature', 'Adventure', 'Religious', 'Culture']

// Helper: auto-generate a slug id from the place name
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

const AdminPlaceForm = () => {
  const navigate = useNavigate()
  const { placeId } = useParams() // present only in edit mode
  const { places, addPlace, updatePlace, getPlaceById, statesInfo } = usePlacesStore()

  const isEditMode = Boolean(placeId)
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      const existing = getPlaceById(placeId)
      if (existing) {
        setFormData({
          ...existing,
          nearbyPlaces: (existing.nearbyPlaces || []).join(', '),
        })
      }
    }
  }, [isEditMode, placeId, getPlaceById])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      // auto-fill id from name when adding new (only if user hasn't manually edited id)
      if (name === 'name' && !isEditMode) {
        updated.id = slugify(value)
      }
      // auto-fill stateName when state dropdown changes
      if (name === 'state') {
        updated.stateName = statesInfo[value]?.name || value
      }
      return updated
    })
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Place name is required'
    if (!formData.state) newErrors.state = 'Please select a state'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'
    if (!isEditMode && places.some((p) => p.id === formData.id)) {
      newErrors.name = 'A place with this name already exists'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      ...formData,
      rating: parseFloat(formData.rating) || 4.5,
      nearbyPlaces: formData.nearbyPlaces
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }

    if (isEditMode) {
      updatePlace(placeId, payload)
    } else {
      addPlace(payload)
    }

    setSaved(true)
    setTimeout(() => {
      navigate('/admin/places')
    }, 1200)
  }

  const stateOptions = Object.entries(statesInfo).map(([key, val]) => ({
    value: key,
    label: val.name,
  }))

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/admin/places')}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <i className="ri-arrow-left-line text-lg text-gray-600"></i>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {isEditMode ? 'Edit Place' : 'Add New Place'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isEditMode ? `Editing "${formData.name}"` : 'Fill in the details for the new destination'}
            </p>
          </div>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <i className="ri-checkbox-circle-fill text-green-500 text-2xl"></i>
            <div>
              <p className="text-green-700 font-bold">Saved successfully!</p>
              <p className="text-green-600 text-sm">Redirecting to places list...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 space-y-6">

          {/* Basic Info */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-information-line text-orange-500"></i> Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Place Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Hawa Mahal"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                {formData.id && !isEditMode && (
                  <p className="text-gray-400 text-xs mt-1">Slug: {formData.id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-700 ${errors.state ? 'border-red-400' : 'border-gray-300'}`}
                >
                  <option value="">Select a state</option>
                  {stateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Jaipur"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.city ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-700"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1–5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="1"
                  max="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-file-text-line text-orange-500"></i> Destination Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a rich description with historical significance..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Best Time to Visit</label>
                  <input
                    type="text"
                    name="bestTime"
                    value={formData.bestTime}
                    onChange={handleChange}
                    placeholder="e.g. October – March"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Entry Fee</label>
                  <input
                    type="text"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    placeholder="e.g. ₹50 (Indians)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Timings</label>
                  <input
                    type="text"
                    name="timings"
                    value={formData.timings}
                    onChange={handleChange}
                    placeholder="e.g. 9:00 AM – 6:00 PM"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media & Links */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-image-line text-orange-500"></i> Media & Related Places
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.image ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="preview"
                    className="mt-3 w-full h-40 object-cover rounded-xl border border-gray-200"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nearby Place IDs (comma separated)</label>
                <input
                  type="text"
                  name="nearbyPlaces"
                  value={formData.nearbyPlaces}
                  onChange={handleChange}
                  placeholder="e.g. amber-fort, city-palace-jaipur"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <p className="text-gray-400 text-xs mt-1">Use the exact place ID (slug), separated by commas.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/admin/places')}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <i className="ri-save-line"></i> {isEditMode ? 'Update Place' : 'Add Place'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminPlaceForm