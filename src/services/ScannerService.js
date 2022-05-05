import axios from '@/axiosConfig'

export const uploadFileRequest = async (file) => {
  const formData = new FormData()

  formData.append('repositoryName', 'unknown')
  formData.append('commitName', 'unknown')

  formData.append('fileData', file)

  return axios.post('1.0/open/uploads/dependencies/files', formData)
}

export const concludeUploadRequest = async (id) => {
  return axios.post('1.0/open/finishes/dependencies/files/uploads', {
    "ciUploadId": id,
    "repositoryName": 'unknown',
    "commitName": 'unknown',
  })
}

export const checkUploadStatusRequest = async (id) => {
  return axios.get('1.0/open/ci/upload/status', {
    params: { ciUploadId: id }
  })
}