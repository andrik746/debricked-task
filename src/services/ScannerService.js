import axios from '@/axiosConfig'
import handleError from '@/utils/handleError'

export const uploadFileRequest = async (file) => {
  try {
    const formData = new FormData()

    formData.append('repositoryName', 'unknown')
    formData.append('commitName', 'unknown')

    formData.append('fileData', file)

    const response = await axios.post('1.0/open/uploads/dependencies/files', formData)

    return response
  } catch(e) {
    handleError(e)
  }
}

export const concludeUploadRequest = async (id) => {
  try {
    const response = await axios.post('1.0/open/finishes/dependencies/files/uploads', {
      "ciUploadId": id,
      "repositoryName": 'unknown',
      "commitName": 'unknown',
    })

    return response
  } catch(e) {
    handleError(e)
  }
}

export const checkUploadStatusRequest = async (id) => {
  try {
    const response = await axios.get('1.0/open/ci/upload/status', {
      params: { ciUploadId: id }
    })

    return response
  } catch(e) {
    handleError(e)
  }
}