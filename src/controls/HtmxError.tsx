const _javascript = {
  __html: `
document.body.addEventListener('htmx:responseError', (event) => {
  const status = event.detail.xhr.status;
  const statusText = event.detail.xhr.statusText || 'Unknown Error';
  const responseText = event.detail.xhr.responseText || '';

  let title = \`Error \${status}\`;
  let text = \`An error occurred: \${statusText}\`;

  if (status === 401) {
    title = 'Unauthorized';
    text = 'You are not authorized to perform this action.';
  } else if (status === 403) {
    title = 'Forbidden';
    text = 'You do not have permission to access this resource.';
  } else if (status === 404) {
    title = 'Not Found';
    text = 'The requested resource could not be found.';
  } else if (status === 500) {
    title = 'Server Error';
    text = 'An internal server error occurred. Please try again later.';
  }

  if (responseText) {
    text += \`\\n\\nDetails: \${responseText}\`;
  }

  showModal(title, text);
});

function showModal(title, text) {
  const modal = document.getElementById('htmx-error-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  if (modal) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.showModal();
  }
}

function closeModal() {
  const modal = document.getElementById('htmx-error-modal');
  if (modal) {
    modal.close();
  }
}
` }


const HtmxError = () => {
  return (
    <>
      <script dangerouslySetInnerHTML={_javascript} />
      <dialog id="htmx-error-modal">
        <article>
          <header>
            <h3 id="modal-title">Error</h3>
            <button aria-label="Close" class="close" onclick="closeModal()"> </button>
          </header>
          <p id="modal-text">An unexpected error occurred.</p>
          <footer>
            <button onclick="closeModal()">Close</button>
          </footer>
        </article>
      </dialog>
    </>
  )
}

export default HtmxError