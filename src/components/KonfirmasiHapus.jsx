
import { hapusProyek } from "@/app/kelola/action";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function KonfirmasiHapus({ id, judul }) {
  const aksiHapus = hapusProyek.bind(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button type="button" variant="destructive" size="sm" />}
      >
        Hapus
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus proyek ini?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Proyek "{judul}" akan dihapus dari database.
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <form action={aksiHapus}>
            <input type="hidden" name="id" value={id} />

            <AlertDialogAction
              type="submit"
              render={<button type="submit" />}
            >
              Ya, hapus
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
