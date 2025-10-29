export function loader(target, filepath) {
  return fetch(filepath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${filepath}: ${response.status}`);
      return response.text();
    })
    .then(html => {
      document.getElementById(target).innerHTML = html;
    })
    .catch(error => console.error('Error loading component:', error));
}


