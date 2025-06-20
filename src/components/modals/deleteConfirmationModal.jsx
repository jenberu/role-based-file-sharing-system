import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { AlertTriangle } from "lucide-react";

const DeleteConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
    isLoading,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-amber-50 ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-yellow-500 w-5 h-5" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
                      Are you sure you want to delete selected { title }(s)? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <button className="mr-2 cursor-pointer">Cancel</button>
          </DialogClose>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
