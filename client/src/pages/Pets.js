import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import _get from 'lodash/get'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const GET_PETS = gql`
  query GetPets {
    pets {
      id, name, type, img
    }
  }
`

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { loading, error, data } = useQuery(GET_PETS)

  const onSubmit = input => {
    setModal(false)
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error!</p>
  }

  const pets = _get(data, 'pets') || []

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={pets} />
      </section>
    </div>
  )
}
