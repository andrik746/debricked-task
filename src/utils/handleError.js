import { message } from 'ant-design-vue'

export default (e) => {
  // handles errors gracefully
  console.log(e)

  let errorMessage = e.response?.data?.message || e.message || 'Something went wrong'

  if (errorMessage) {
    message.error(errorMessage)
  }
};
