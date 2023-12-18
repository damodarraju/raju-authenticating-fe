import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
// import seatsList from "../data.json";
import BookingForm from "./BookingForm";
import moment from "moment";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Reservation() {
	const [seats, setSeats] = useState([]);
	const [selectedseatsList, setSelectedseatsList] = useState("");
	const [open, setOpen] = useState(false);
	const [formData, setformData] = useState({});

	useEffect(() => {
		fetchTickets();
	}, []);

	const fetchTickets = async () => {
		await fetch("https://raju-authenticating-be.onrender.com")
			.then((response) => response.json())
			.then((data) => {
				let [list, chunkSize] = [data, 20];
				list = [...Array(Math.ceil(list.length / chunkSize))].map((_) =>
					list.splice(0, chunkSize)
				);
				setSeats(list);
			});
	};

	const handleSubmit = async () => {
		setOpen(false);
		const formBody = {
			id: selectedseatsList.id,
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
				fetchTickets();
				setformData({});
				setSelectedseatsList("");
				alert("Successfully Booked");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="mx-6">
			<RadioGroup value={selectedseatsList} onChange={setSelectedseatsList}>
				<RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
					Upper Deck
				</RadioGroup.Label>

				{seats.length > 0 && (
					<BookingForm
						open={open}
						setOpen={setOpen}
						seatNumber={selectedseatsList}
						formData={formData}
						setformData={setformData}
						handleSubmit={handleSubmit}
						title={"Confirm Booking"}
					/>
				)}

				{}

				<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-10 sm:gap-x-10 mb-4">
					{seats.length > 0 &&
						seats[0].map((seat) => (
							<RadioGroup.Option
								key={seat.id}
								value={seat}
								disabled={seat.booked}
								className={({ active }) =>
									classNames(
										active
											? "border-indigo-600 ring-2 ring-indigo-600"
											: "border-gray-300",
										seat.booked
											? "relative flex cursor-pointer rounded-lg border bg-gray-200 p-4 shadow-sm focus:outline-none"
											: "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
									)
								}>
								{({ checked, active }) => (
									<>
										<span className="flex flex-1">
											<span className="flex flex-col">
												<RadioGroup.Label
													as="span"
													className="block text-sm font-medium text-gray-900">
													{"Seat"} {seat.id}
												</RadioGroup.Label>{" "}
											</span>
										</span>
										<CheckCircleIcon
											className={classNames(
												!checked ? "invisible" : "",
												"h-5 w-5 text-indigo-600"
											)}
											aria-hidden="true"
										/>
										<span
											className={classNames(
												active ? "border" : "border-2",
												checked ? "border-indigo-600" : "border-transparent",
												"pointer-events-none absolute -inset-px rounded-lg"
											)}
											aria-hidden="true"
										/>
									</>
								)}
							</RadioGroup.Option>
						))}
				</div>

				<RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
					Lower Deck
				</RadioGroup.Label>

				<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-10 sm:gap-x-10">
					{seats.length > 0 &&
						seats[1].map((seat) => (
							<RadioGroup.Option
								key={seat.id}
								value={seat}
								disabled={seat.booked}
								className={({ active }) =>
									classNames(
										active
											? "border-indigo-600 ring-2 ring-indigo-600"
											: "border-gray-300",
										seat.booked
											? "relative flex cursor-pointer rounded-lg border bg-gray-200 p-4 shadow-sm focus:outline-none"
											: "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
									)
								}>
								{({ checked, active }) => (
									<>
										<span className="flex flex-1">
											<span className="flex flex-col">
												<RadioGroup.Label
													as="span"
													className="block text-sm font-medium text-gray-900">
													{"Seat"} {seat.id}
												</RadioGroup.Label>{" "}
											</span>
										</span>
										<CheckCircleIcon
											className={classNames(
												!checked ? "invisible" : "",
												"h-5 w-5 text-indigo-600"
											)}
											aria-hidden="true"
										/>
										<span
											className={classNames(
												active ? "border" : "border-2",
												checked ? "border-indigo-600" : "border-transparent",
												"pointer-events-none absolute -inset-px rounded-lg"
											)}
											aria-hidden="true"
										/>
									</>
								)}
							</RadioGroup.Option>
						))}
				</div>
				<button
					disabled={!selectedseatsList}
					type="button"
					onClick={() => setOpen(true)}
					className={
						!selectedseatsList
							? "mt-5 rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							: "mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					}>
					Book Now
				</button>
			</RadioGroup>
		</div>
	);
}
