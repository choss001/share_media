'use client'
import Image from "next/image";

export default function Home() {
  function formAction(){
    return
  }

  const customers = [{id:1, value:"test1"}, {id:2, value:"test2"},{id:3, value:"test3"} ]
  return (
    <form>
      <div className="p-6 h-screen">
        <div className="bg-gray-50 w-min-full p-6 items-center">
          <label className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <select
            id="customer"
            name="customerId"
            className=""
            defaultValue=""
            aria-describeby="customer-error"
          >
            <option value="" disabled>
              Select a customer

            </option>
            {customers.map((customer) => (
              <option key={customer.id}>
                {customer.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
