import Link from "next/link";


export default function sideNav(){
  return (
    <>
      <div className="flex h-full flex-col px-3 py-5 bg-white">
        <Link
          className="mb-2 w-full h-20 items-end rounded-md bg-blue-600 -p4"
          href="/services"
          />
        <div className="w-full bg-slate-200 h-20 rounded-md"> test</div>
      </div>
     

    </>
  )
}