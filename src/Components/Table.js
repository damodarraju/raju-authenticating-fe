import React from "react";
import { useState, useEffect } from "react";
import BookingForm from "../Components/BookingForm";
import moment from "moment";
import DeleteModal from "../Modals/DeleteModal";

function Table() {
	const [tickets, setTickets] = useState([]);
	const [ticketId, setTicketId] = useState();
	const [open, setOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [formData, setformData] = useState({});

	useEffect(() => {
		fetchOpenTicket();
	}, []);

	const fetchOpenTicket = async () => {
		await fetch("https://raju-authenticating-be.onrender.com/tickets/open")
			.then((response) => response.json())
			.then((data) => {
				setTickets(data);
			});
	};

	const handleSubmit = async () => {
		setOpen(false);
		const formBody = {
			id: ticketId,
			user: {
				...formData,
				dateOfBooking: moment().format("DD/MM/YYYY"),
			},
		};

		fetch("https://raju-authenticating-be.onrender.com", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(formBody),
		})
			.then(async (response) => {
				const data = await response.json();

				if (!response.ok) {
					const error = data || response.status;
					return Promise.reject(error);
				}
				fetchOpenTicket();
				setformData({});
				alert("Successfully Booking Updated");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteBooking = () => {
		setDeleteModalOpen(false);
		const formBody = {
			id: ticketId,
		};

		fetch(`https://raju-authenticating-be.onrender.com/ticket/delete`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(formBody),
		})
			.then(async (response) => {
				const data = await response.json();

				if (!response.ok) {
					const error = data || response.status;
					return Promise.reject(error);
				}
				fetchOpenTicket();
				alert("Ticket cancelled successfully");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div className="container mx-auto px-2 mt-10">
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<h1 className="text-base font-semibold leading-6 text-gray-900">
								Tickets
							</h1>
						</div>
					</div>
					<div className="mt-8 flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
													Seat Number
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Name
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Email
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Date of Booking
												</th>
												<th
													scope="col"
													className="relative py-3.5 pl-3 pr-4 sm:pr-0">
													<span className="sr-only">Edit</span>
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{tickets.length === 0 ? (
												<tr>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
														{"No tickets found"}
													</td>
												</tr>
											) : (
												tickets.map((ticket) => (
													<tr key={ticket.id}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
															{ticket.id}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{ticket.user.firstname} {ticket.user.lastname}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{ticket.user.email}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{ticket.user.dateOfBooking}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<button
																onClick={() => {
																	setTicketId(ticket.id);
																	setOpen(true);
																	setformData(ticket.user);
																}}
																className="text-indigo-600 hover:text-indigo-900 mx-2">
																Edit
															</button>
															<button
																onClick={() => {
																	setTicketId(ticket.id);
																	setDeleteModalOpen(true);
																}}
																className="text-indigo-600 hover:text-indigo-900 mx-2">
																Delete
															</button>
															{ticketId === ticket.id && (
																<DeleteModal
																	deleteModalOpen={deleteModalOpen}
																	setDeleteModalOpen={setDeleteModalOpen}
																	handleSubmit={deleteBooking}
																/>
															)}
															{ticketId === ticket.id && (
																<BookingForm
																	open={open}
																	setOpen={setOpen}
																	seatNumber={ticket}
																	formData={formData}
																	setformData={setformData}
																	handleSubmit={handleSubmit}
																	title={"Update Booking"}
																/>
															)}
														</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Table;
