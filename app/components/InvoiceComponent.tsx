import { Invoice } from '@/type'
import { CheckCircle, Clock, FileText, SquareArrowOutUpRight, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type InvoiceComponentProps = {
  invoice: Invoice;
  index: number
};

const getStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return (
        <div className='badge badge-lg flex items-center gap-2 p-4'>
          <FileText className='w-4' />
          Brouillon 🗒️
        </div>
      )
    case 2:
      return (
        <div className='badge badge-lg badge-warning flex items-center gap-2 p-4'>
          <Clock className='w-4' />
          En attente ⏳
        </div>
      )
    case 3:
      return (
        <div className='badge badge-lg badge-success flex items-center gap-2 p-4'>
          <CheckCircle className='w-4' />
          Payée 💲
        </div>
      )
    case 4:
      return (
        <div className='badge badge-lg badge-info flex items-center gap-2 p-4'>
          <XCircle className='w-4' />
          Annulée ✖️
        </div>
      )
    case 5:
      return (
        <div className='badge badge-lg badge-error flex items-center gap-2 p-4'>
          <XCircle className='w-4' />
          Impayée ⚠️
        </div>
      )
    default:
      return (
        <div className='badge badge-lg flex items-center gap-2 p-4'>
          <XCircle className='w-4' />
          Indefinis
        </div>
      )
  }
};

// const getStatusBadge = (status: number) => {
//   const badgeConfig = {
//     1: {
//       className: 'badge badge-lg flex items-center gap-2',
//       icon: <FileText className="w-4" />,
//       label: 'Brouillon',
//     },
//     2: {
//       className: 'badge badge-lg badge-warning flex items-center gap-2',
//       icon: <Clock className="w-4" />,
//       label: 'En attente ⏰',
//     },
//     3: {
//       className: 'badge badge-lg badge-success flex items-center gap-2',
//       icon: <CheckCircle className="w-4" />,
//       label: 'Payée 💲',
//     },
//     4: {
//       className: 'badge badge-lg badge-info flex items-center gap-2',
//       icon: <XCircle className="w-4" />,
//       label: 'Annulée ✖️',
//     },
//     5: {
//       className: 'badge badge-lg badge-error flex items-center gap-2',
//       icon: <XCircle className="w-4" />,
//       label: 'Impayée ⚠️',
//     },
//     default: {
//       className: 'badge badge-lg flex items-center gap-2',
//       icon: <XCircle className="w-4" />,
//       label: 'Indéfini',
//     },
//   };

//   const config = badgeConfig[status] || badgeConfig.default;

//   return (
//     <div className={config.className}>
//       {config.icon}
//       {config.label}
//     </div>
//   );
// };

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({ invoice, index }) => {

  // const calculateTotal = () => {
  //   const totalHT = invoice?.lines?.reduce((acc, line) => {
  //     const quantity = line.quantity ?? 0;
  //     const unitPrice = line.unitPrice ?? 0;
  //     return acc + quantity * unitPrice
  //   }, 0)

  //   const totalVAT = totalHT * (invoice.vatRate / 100);
  //   return totalHT + totalVAT
  // }

  const calculateTotal = () => {
    if (!invoice || !Array.isArray(invoice.lines)) {
      throw new Error("Données de facture invalides ou manquantes.");
    }
  
    const { lines, vatRate = 0 } = invoice;
  
    const totalHT = lines.reduce((acc, { quantity = 0, unitPrice = 0 }) => {
      return acc + quantity * unitPrice;
    }, 0);
  
    const totalVAT = totalHT * (vatRate / 100);
    return totalHT + totalVAT;
  };
  
  return (
    <div className='bg-base-200/90 p-5 rounded-xl space-y-2 shadow'>
      <div className='flex justify-between items-center w-full'>

        <div>{getStatusBadge(invoice.status)}</div>

        <Link
          className='btn btn-accent btn-sm'
          href={`/invoice/${invoice.id}`}>
          ➕
          <SquareArrowOutUpRight className='w-4' />
        </Link>
      </div>

      <div className='w-full'>
        <div className=''>
          <div className='stat-title'>
            <div className='font-bold text-sm'>Facture: {invoice.id}</div>
          </div>
          <div>
            <div className='stat-value'>
              {calculateTotal().toFixed(2)} €
            </div>
          </div>
          <div className='stat-desc'>
            {invoice.name}
          </div>
        </div>
      </div>
    </div>
  )
};

export default InvoiceComponent

