async function main(worker, dataset) {
  try {
    const registration = await worker.register(dataset.worker, { scope: dataset.scope })
    console.info('Service worker registration successful', { scope: registration.scope })
  } catch (error) {
    console.error('Service worker registration failed', { error })
  }
}

navigator.serviceWorker && main(navigator.serviceWorker, document.currentScript.dataset)
