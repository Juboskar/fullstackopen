const Notification = ({ message, error }) => {
  if (message === null) {
    return <div />
  } else {

    const messageColor = error ? 'red' : 'green'

    const messageStyle = {
      color: messageColor,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }
}

export default Notification