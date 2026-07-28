import dynamic from 'next/dynamic'

const StoresPage = dynamic(() => import('../euromebel-stores'), { ssr: false })

export default StoresPage
