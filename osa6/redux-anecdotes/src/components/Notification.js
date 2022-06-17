import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.visible) {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  } else {
    return <div />
  }
}

export default Notification