import { useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(addFilter(content))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

export default Filter