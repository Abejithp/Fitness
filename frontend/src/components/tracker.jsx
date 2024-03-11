import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Popup from "./popup"
import { getActive } from "@/api/progression.mjs"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export function Tracker({data}) {

  return (
    <Table className="mt-8 z-0">
      <TableHeader>
        <TableRow>
          <TableHead className="max-tablet:hidden">Muscle Group</TableHead>
          <TableHead>Exercise</TableHead>
          <TableHead className="max-tablet:hidden">Status</TableHead>
          <TableHead>Popup</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice} className="text-white">
            <TableCell className="font-medium max-tablet:hidden">{invoice.invoice}</TableCell>
            <TableCell className="max-tablet:hidden">{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell >
              <Popup />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}


export async function getServerSideProps() {
  const res = await getActive()
  const data = await res.json()

  return { props: { data } }
}