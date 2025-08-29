import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { getAvatarUrl, generateUniqueFileName } from './utils/storage'

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) {
      setAvatarUrl(getAvatarUrl(url))
    }
  }, [url])

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Devi selezionare un\'immagine da caricare.')
      }

      const file = event.target.files[0]
      const fileName = generateUniqueFileName(file.name)
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="text-center">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full object-cover border-4 border-gold-400/30 shadow-lg hover:border-gold-400/60 transition-all duration-300 hover:scale-105"
          style={{ height: size, width: size }}
        />
      ) : (
        <div 
          className="rounded-full bg-gradient-to-br from-dark-900 to-surface-secondary border-4 border-dashed border-gold-400/30 flex items-center justify-center text-gold-400 text-4xl hover:border-gold-400/60 transition-all duration-300 hover:scale-105"
          style={{ height: size, width: size }}
        >
          👤
        </div>
      )}
      <div className="mt-4">
        <label 
          className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-semibold rounded-2xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-block"
          htmlFor="single"
        >
          {uploading ? 'Caricamento...' : 'Carica Avatar'}
        </label>
        <input
          className="hidden"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}