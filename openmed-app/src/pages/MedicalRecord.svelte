<script>
    import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
    import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { get, putS3URL, del } from "../util";
    let tableHeading = ["Nome file", "Data", "Dimensione", "Azioni"];
    import { name, loggedId } from "../state";
    let _id = "";
    let data = {};

    async function getFilesList() {
        const list = await get("/files/" + $loggedId);
        console.log('files list:', list);
        return list;
    }

    // File download
    async function download(record) {
        console.log("download record:", record);
        // console.log('download event:',event);

        const resp = await get("/files/url/" + record.Key + "?mode=getObject");
        console.log("signedURL:", resp);
        window.open(resp.url);
        // fetch(resp.url)
        //     .then(res => res.blob())
        //     .then(blob => {
        //         console.log(blob);
        //         const donwloadedFile = new File([blob], "File name",{ type: blob.type })
        //         const obj_url = URL.createObjectURL(blob);
        //         window.open(obj_url)
        // })
    }

    // One or more files upload
    async function upload(event) {
        console.log("upload event:", event);
        const input = document.querySelector("input[type=file]");
        const curFiles = input.files;

        if (curFiles.length === 0) {
            console.warn('Nessun file selezionato');
        }else{
            for(const file of curFiles) {
                if(file){
                    let fileName = file.name;
                    let type = file.type;
                    console.log('file:', file);
                    console.log('fileName:', fileName);

                    const key = $loggedId + "/" + fileName;

                    let resp = await get("/files/url/" + key + "?mode=putObject");
                    const signedURL = resp.url;
                    console.log('put URL:', signedURL);

                    resp = await putS3URL(signedURL, file);
                    console.log('put resp:', resp);
                    if(resp.ok){
                        alert('File caricato con successo!');
                        window.location.reload();
                    }
                        
                    // var reader = new FileReader();
                    // reader.readAsDataURL(file);

                    // reader.addEventListener("load", async () => {
                    //     let data = {
                    //         type: type,
                    //         file: reader.result
                    //     };
                    //     console.log('reader:',reader.result);
                    //     // let fileToSend = new File([reader.result], fileName, metadata);
                    //     const resp = await put("/files/" + $loggedId + "/" + fileName , data);
                    //     console.log('upload resp',resp);
                    // }, false);
                }
            }
        }
    }
</script>

User name: {$name}<br>
loggedId: {$loggedId}
<Table bordered responsive>
    <thead>
        <tr>
            {#each tableHeading as heading}
                <th>{heading}</th>
            {/each}
        </tr>
    </thead>
    {#await getFilesList() then records}
        <tbody>
            <tr />
            {#each records as record}
                <tr>
                    <th scope="row">{record.Key.split("/")[1]}</th>
                    <td>{record.LastModified}</td>
                    <td>{record.Size}</td>
                    <td
                        ><Button
                            on:click={() => {
                                download(record);
                            }}>Scarica</Button
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    {/await}
</Table>
<input class="btn btn-accent" type="file" id="file" name="file" multiple />
<Button on:click={upload}>Carica</Button>
