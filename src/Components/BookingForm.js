import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function BookingForm({
	open,
	setOpen,
	seatNumber,
	formData,
	setformData,
	handleSubmit,
	title,
}) {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
								<div>
									<div className="mt-3 mb-8 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-base font-semibold leading-6 text-gray-900">
											Passenger Information
										</Dialog.Title>
									</div>
									<div className="mt-2">
										<div>
											<label
												htmlFor="seat"
												className="block text-sm font-medium leading-6 text-gray-900">
												Seat Number
											</label>
											<div className="mt-2">
												<input
													type="text"
													name="seat"
													id="seat"
													value={seatNumber?.id}
													disabled
													className="bg-gray-200 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-200 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6">
											<div className="sm:col-span-3">
												<label
													htmlFor="first-name"
													className="block text-sm font-medium leading-6 text-gray-900">
													First name
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="first-name"
														id="first-name"
														autoComplete="given-name"
														placeholder={seatNumber?.user?.firstname}
														value={formData.firstname}
														onChange={(e) =>
															setformData({
																...formData,
																firstname: e.target.value,
															})
														}
														className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											<div className="sm:col-span-3">
												<label
													htmlFor="last-name"
													className="block text-sm font-medium leading-6 text-gray-900">
													Last name
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="last-name"
														id="last-name"
														autoComplete="family-name"
														placeholder={seatNumber?.user?.lastname}
														value={formData.lastname}
														onChange={(e) =>
															setformData({
																...formData,
																lastname: e.target.value,
															})
														}
														className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>
										<div className="mt-4">
											<label
												htmlFor="email"
												className="block text-sm font-medium leading-6 text-gray-900">
												Email
											</label>
											<div className="mt-2">
												<input
													type="text"
													name="email"
													id="email"
													autoComplete="email"
													placeholder={seatNumber?.user?.email}
													value={formData.email}
													onChange={(e) =>
														setformData({
															...formData,
															email: e.target.value,
														})
													}
													className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										onClick={handleSubmit}>
										{title}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
