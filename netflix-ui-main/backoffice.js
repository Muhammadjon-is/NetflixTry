const params = new URLSearchParams(window.location.search);
const appointmentId = params.get("appointmentId");

window.onload = async () => {
  if (appointmentId) {
    // We are editing - let's get the event to edit,
    // and prefill the form with its info.
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/agenda/${appointmentId}`
    );
    const appointment = await response.json();

    let submitButton = document.querySelector("#submit-button");
    submitButton.innerText = "Edit Event";
    submitButton.classList.remove("btn-primary");
    submitButton.classList.add("btn-success");

    document.querySelector("#event-name").value = appointment.name;
    document.querySelector("#event-description").value =
      appointment.description;
    document.querySelector("#event-price").value = appointment.price;

    document.querySelector("#event-time").value =
      appointment.time.split(".")[0];
  }
};

async function onFormSubmit(event) {
  event.preventDefault();

  const newEvent = {
    name: document.querySelector("#event-name").value,
    description: document.querySelector("#event-description").value,
    price: document.querySelector("#event-price").value,
    time: document.querySelector("#event-time").value,
  };

  const options = {
    method: appointmentId ? "PUT" : "POST",

    body: JSON.stringify(newEvent),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const endpoint = appointmentId
      ? `https://striveschool-api.herokuapp.com/api/agenda/${appointmentId}`
      : "https://striveschool-api.herokuapp.com/api/agenda/";

    const response = await fetch(endpoint, options);

    if (response.ok) {
      // Because we want to do this only if the response code is 200 OK
      alert(
        appointmentId
          ? "Appointment edited successfully!"
          : "Appointment created successfully!"
      );
    } else {
      throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
    }
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
}
