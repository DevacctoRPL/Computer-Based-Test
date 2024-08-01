import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const getData = async() => {
    const res = await axios.get('http://localhost:7772/api/siswa')
    setUsers(res.data)
  }

  useEffect(() => {
    getData()
  }, [])
 
  return (
    <div>
      {users.map(u => <h4 key={u._id}>userName : {u.nama}</h4>)}
    </div>
  )
}

export default App