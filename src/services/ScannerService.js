import axios from '@/axiosConfig'
import handleError from '@/utils/handleError'

export const uploadFilesRequest = async (fileList) => {
  try {
    // send request for the 1st file, get the id of the upload
    // send simultanious requests to upload the rest of the files (use promise all settled)

    const formData = new FormData()

    formData.append('repositoryName', 'unknown')
    formData.append('commitName', 'unknown')
    // if (uploadId) formData.append('ciUploadId', uploadId)

    fileList.forEach(file => {
      formData.append('fileData', file)
    })

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