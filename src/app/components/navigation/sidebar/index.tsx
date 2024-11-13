import Link from "next/link";


export default function sideNav(){
  return (
    <>
      <div className="flex h-full flex-col px-3 py-5 bg-white">
        <Link
          className="mb-2 w-full h-20 items-end rounded-md bg-blue-600 -p4 flex items-center justify-center"
          href="/">
          <div className="">main</div>
        </Link>
        <Link
          className="mb-2 w-full h-20 bg-slate-200 items-end rounded-md bg-blue-600 -p4 flex items-center justify-center"
          href="/services">
          <div>services</div>
        </Link>
        <Link
          className="mb-2 w-full h-20 bg-slate-200 items-end rounded-md bg-blue-600 -p4 flex items-center justify-center"
          href="/test">
          <div>upload</div>
        </Link>
      </div>
    </>
  )
}