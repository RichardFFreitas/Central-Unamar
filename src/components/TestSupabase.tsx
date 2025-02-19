import { useState, useEffect } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import AddressInput from './AdressInput'

interface Business {
  id: number
  name: string
  category: string
  description: string
  address: string
  telephone: string
}

export default function TestSupabase() {
  const { getBusinesses, createBusiness } = useSupabase()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    telephone: ''
  })

  useEffect(() => {
    loadBusinesses()
  }, [])

  const loadBusinesses = async () => {
    setLoading(true)
    const data = await getBusinesses()
    setBusinesses(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createBusiness(newBusiness)
    setNewBusiness({
      name: '',
      category: '',
      description: '',
      address: '',
      telephone: ''
    })
    loadBusinesses()
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Teste Supabase</h1>

      {/* Formulário de criação */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nome do negócio"
            value={newBusiness.name}
            onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Categoria"
            value={newBusiness.category}
            onChange={(e) => setNewBusiness({ ...newBusiness, category: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <textarea
            placeholder="Descrição"
            value={newBusiness.description}
            onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <AddressInput 
            onAddressSelect={(address) => 
              setNewBusiness({ ...newBusiness, address: address })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Telefone"
            value={newBusiness.telephone}
            onChange={(e) => setNewBusiness({ ...newBusiness, telephone: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Criar Negócio
        </button>
      </form>

      {/* Lista de negócios */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Negócios Cadastrados:</h2>
        {businesses.map((business) => (
          <div key={business.id} className="border p-4 rounded">
            <h3 className="font-bold">{business.name}</h3>
            <p className="text-gray-600">{business.category}</p>
            <p>{business.description}</p>
            <p>{business.address}</p>
            <p>{business.telephone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}