<!-- TODO Implement a proper error page -->

<script context="module">
  export async function load({ error, status }) {
    return {
      status: status,
      props: {
        err: `${status}: ${error.message}`
      }
    };
  }
</script>


<script>
  export let err;
</script>


<h1>Something went wrong</h1>
<p>{err}</p>



<style>

</style>