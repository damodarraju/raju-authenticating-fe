import React, { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

function Admin() {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const deleteBooking = () => {
		setDeleteModalOpen(false);

		fetch("http://localhost:3000/admin/reset", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		})
			.then(async (response) => {
				const data = await response.json();

				if (!response.ok) {
					const error = data || response.status;
					return Promise.reject(error);
				}
				alert("All Booking deleted successfully");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<DeleteModal
				deleteModalOpen={deleteModalOpen}
				setDeleteModalOpen={setDeleteModalOpen}
				handleSubmit={deleteBooking}
			/>
			<div className="container mx-auto px-2 mt-10">
				<div className="mx-6">
					<button
						onClick={() => setDeleteModalOpen(true)}
						type="button"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Reset all Bookings
					</button>
				</div>
			</div>
		</>
	);
}

export default Admin;
