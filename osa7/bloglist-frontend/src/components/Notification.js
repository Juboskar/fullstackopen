import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return <div />
  } else {
    const messageColor = notification.error ? 'red' : 'green'

    const messageStyle = {
      color: messageColor,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }

    return <div style={messageStyle}>{notification.message}</div>
  }
}

export default Notification
