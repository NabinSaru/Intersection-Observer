const navigatorSlots = document.querySelectorAll('.navigator-slot');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // if (entry.isIntersecting) observer.unobserve(entry.target); // to prevent the already loaded image to animate
    });
  }, {
  // threshold: 1,
  rootMargin: '-50px',
}
);

const lastSlotObserver = new IntersectionObserver(entries => {
  const lastSlot = entries[0];
  if (!lastSlot.isIntersecting) return;
  loadNewCards();
  lastSlotObserver.unobserve(lastSlot.target);
  lastSlotObserver.observe(document.querySelector('.navigator-slot:last-child'));
}, {
  rootMargin: '100px', //this loads the content before 100px ahead, helpful for lazy loading
});

lastSlotObserver.observe(document.querySelector('.navigator-slot:last-child'));

navigatorSlots.forEach(slot => {
  observer.observe(slot);
})

const navigatorSlotContainer = document.querySelector('.navigator');
function loadNewCards() {
  for (let i = 0; i < 10; i += 1) {
    const slot = document.createElement("div");
    slot.textContent = "New Card";
    slot.classList.add("navigator-slot");
    observer.observe(slot);
    navigatorSlotContainer.append(slot);
  }
}