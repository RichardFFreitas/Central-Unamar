import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface Address {
  logradouro: string
  numero: string
  bairro: string
}

interface AddressInputProps {
  onAddressSelect: (address: string) => void
}

export default function AddressInput({ onAddressSelect }: AddressInputProps) {
  const { toast } = useToast()
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [loading, setLoading] = useState(false)
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/^(\d{5})(\d{3}).*/, '$1-$2')
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value)
    setCep(formattedCEP)

    if (formattedCEP.length === 9) {
      searchAddress(formattedCEP)
    }
  }

  const updateAddress = () => {
    if (logradouro && numero && bairro) {
      onAddressSelect(`${logradouro}, ${numero} - ${bairro}`)
    }
  }

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumero(e.target.value)
    updateAddress()
  }

  const searchAddress = async (cepValue: string) => {
    setLoading(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue.replace('-', '')}/json/`)
      const data = await response.json()

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP digitado",
          variant: "destructive",
        })
        setLogradouro('')
        setBairro('')
        return
      }

      setLogradouro(data.logradouro)
      setBairro(data.bairro)
      updateAddress()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar o endereço",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CEP
        </label>
        <input
          type="text"
          value={cep}
          onChange={handleCEPChange}
          maxLength={9}
          placeholder="00000-000"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {loading && (
        <div className="text-sm text-gray-500">
          Buscando endereço...
        </div>
      )}

      {logradouro && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rua
            </label>
            <input
              type="text"
              value={logradouro}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <input
              type="text"
              value={numero}
              onChange={handleNumeroChange}
              placeholder="Digite o número"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bairro
            </label>
            <input
              type="text"
              value={bairro}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  )
}