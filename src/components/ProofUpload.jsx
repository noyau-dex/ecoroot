import { useEffect, useRef, useState } from 'react'

function ProofUpload({ uploadProof, proofType = 'camera' }) {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState(null) // null | 'pending' | 'verified' | 'rejected'
  const inputRef = useRef(null)

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onChange = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      // Basic file validation
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (f.size > maxSize) {
        alert('File size too large. Please select a file smaller than 10MB.')
        e.target.value = '' // Clear the input
        return
      }
      
      // Validate file type based on proofType
      if (proofType === 'camera' && !f.type.startsWith('image/')) {
        alert('Please select an image file for camera proof.')
        e.target.value = '' // Clear the input
        return
      }
      
      if (proofType === 'upload' && !f.type.startsWith('image/') && f.type !== 'application/pdf') {
        alert('Please select an image or PDF file for upload proof.')
        e.target.value = '' // Clear the input
        return
      }
      
      setFile(f)
      setStatus(null)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file || !uploadProof || isUploading) return
    
    try {
      setIsUploading(true)
      setStatus(null) // Clear any previous status
      await uploadProof(file)
      setStatus('pending')
      // Simulate verification after 2 seconds for mock API workflows
      setTimeout(() => {
        setStatus('verified')
      }, 2000)
    } catch (error) {
      console.error('Proof upload failed:', error)
      setStatus('rejected')
    } finally {
      setIsUploading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreviewUrl(null)
    setStatus(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="proof" className="block text-sm font-medium text-gray-700">
            {proofType === 'camera' ? 'Click a live photo' : 'Upload proof (certificate or image)'}
          </label>
          <input
            id="proof"
            ref={inputRef}
            type="file"
            accept={proofType === 'camera' ? 'image/*' : 'image/*,application/pdf'}
            capture={proofType === 'camera' ? 'environment' : undefined}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            aria-label={proofType === 'camera' ? 'Take a live photo with camera' : 'Select certificate or image as proof'}
            multiple={false}
          />
          <p className="mt-1 text-xs text-gray-500">
            {proofType === 'camera' 
              ? 'Live photos only - camera will be used for verification.' 
              : 'Images or PDF certificates are supported.'}
          </p>
        </div>

        {previewUrl && (
          <div className="mt-2 w-full sm:mt-0 sm:w-40">
            {file?.type?.startsWith('video') && proofType !== 'camera' ? (
              <video src={previewUrl} className="h-24 w-full rounded object-cover" controls />
            ) : (
              <img src={previewUrl} alt="Selected proof preview" className="h-24 w-full rounded object-cover" />
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          disabled={!file || isUploading}
          className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto ${
            !file || isUploading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
          }`}
          aria-label="Submit proof for verification"
        >
          {isUploading ? 'Uploading…' : 'Submit Proof'}
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 sm:w-auto"
        >
          Reset
        </button>
      </div>

      {status && (
        <div className="mt-3">
          {status === 'pending' && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Pending verification</span>
          )}
          {status === 'verified' && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Verified</span>
          )}
          {status === 'rejected' && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">Rejected</span>
          )}
        </div>
      )}
    </form>
  )
}

export default ProofUpload


