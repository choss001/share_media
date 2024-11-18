// import connectDB from "@/config/connectDB"
// import { Film } from "@/models"
// import { NextResponse } from "next/server"
// import fs from "fs"

// const CHUNK_SIZE = 1000000 // 1MB
// connectDB()

// async function getVideoStream(req, id) {
//   const range = req.headers.get("range")

//   if (!range) {
//     return new Response("Range header missing", { status: 400 })
//   }

//   const film = await Film.findById(id)
//   console.log("backend film", film)
//   const filePath = film.storage
//   const stat = fs.statSync(filePath)
//   const fileSize = stat.size

//   const chunkStart = Number(range.replace(/\D/g, "")) || 0
//   const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, fileSize - 1)

//   const contentLength = chunkEnd - chunkStart + 1

//   const headers = {
//     "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength.toString(),
//     "Content-Type": "video/mp4",
//   }

//   const videoStream = fs.createReadStream(filePath, { start: chunkStart, end: chunkEnd })
//   const response = new Response(videoStream, { status: 206, headers })

//   return response
// }

// export async function GET(request, { params }) {
//   try {
//     return await getVideoStream(request, params?.id)
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 })
//   }
// }