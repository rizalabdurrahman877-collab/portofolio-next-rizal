"use client";

import { hapusPesan } from "@/app/kelola/actions";
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

export default function TombolHapusPesan({ id }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button type="button" variant="destructive" size="sm" />}
      >
        Hapus Pesan
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus pesan buku tamu?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Pesan ini akan dihapus secara permanen dari database.
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <form action={hapusPesan}>
            <input type="hidden" name="id" value={id} />

            <AlertDialogAction
              type="submit"
              render={<button type="submit" />}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Ya, hapus pesan
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
