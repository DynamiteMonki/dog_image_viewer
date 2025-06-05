<script>
  import { onMount } from 'svelte';

  let breed = 'retriever'; // Default breed
  let imageUrl = '';
  let error = null;

  // Automatically sanitize input
  $: breed = breed.toLowerCase().replace(/\s+/g, '');

  async function fetchDogImage() {
    error = null;
    imageUrl = '';
    try {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await res.json();
      if (data.status === 'success') {
        imageUrl = data.message;
      } else {
        throw new Error(data.message || 'Failed to fetch image');
      }
    } catch (err) {
      error = `Could not load image for breed "${breed}": ${err.message}`;
    }
  }

  onMount(fetchDogImage);
</script>

<style>
  img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
  }
</style>

<h2>🐶 Dog Image Viewer</h2>

<input
  type="text"
  bind:value={breed}
  placeholder="Enter dog breed (e.g. husky, retriever)"
/>
<button on:click={fetchDogImage}>Next</button>

{#if error}
  <p style="color: red;">{error}</p>
{:else}
  {#if imageUrl}
    <img src={imageUrl} alt="Dog Image" />
  {:else}
    <p>Loading...</p>
  {/if}
{/if}
