import NotesPicker from '@/app/topic/components/Tiptapdefault'
import styles from '@/app/topic/components/styles.module.scss'

export default function Home() {
  return (
    <main className="mt-[50px] w-full min-h-screen pb-10">
      <div className={styles.ProseMirror}>
        <NotesPicker />
      </div>
      {/* <Notes /> */}
    </main>
  )
}
