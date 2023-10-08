import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import BigNumber from 'bignumber.js'
import { useContext, useState } from 'react'
import { MainContext } from '../../context.js'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
dotenv.config()

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
console.log('projectId: ', projectId, projectSecret)
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
let ipfs
try {
    ipfs = create({
    url: "https://ipfs.infura.io:5001",
    headers: {
        authorization,
    },
    });
} catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
}

export default function Home() {
    const [images, setImages] = useState([]);

  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [URI, setURI] = useState()
  const [amount, setAmount] = useState()
  const { bundlrInstance, initialiseBundlr, balance, fetchBalance } = useContext(MainContext)
//   const [ipfs , setIpfs] = useState();
  async function initialize() {
    initialiseBundlr()
  }
  
  function onFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      const image = URL.createObjectURL(file)
      setImage(image)
      let reader = new FileReader()
      reader.onload = function () {
        if (reader.result) {
          setFile(Buffer.from(reader.result))
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  async function uploadText() {    
    const data2 = {
      "name": "Sunny",
      "surname": "Radadiya"
    }
    const data = "Hello, Bundlr!"

    // create a Bundlr Transaction
    const tx = bundlrInstance.createTransaction(JSON.stringify(data2))

    // want to know how much you'll need for an upload? simply:
    // get the number of bytes you want to upload
    const size = tx.size
    // query the bundlr node to see the price for that amount
    const cost = await bundlrInstance.getPrice(size);

    // sign the transaction
    await tx.sign()
    // get the transaction's ID:
    const id = tx.id
    // upload the transaction
    const result = await tx.upload()
    console.log('result-id: ', result, id);
    // let tx = await bundlrInstance.upload(data, { tags: [{ name: "Content-type", value: "text/plain" }] } )
    // console.log('tx-text: ', tx, `http://arweave.net/${tx.id}`)
    // setURI(`http://arweave.net/${tx.id}`)
  }

  async function uploadFile() {    
    let tx = await bundlrInstance.upload(file, { tags: [{ name: "Content-type", value: "image/png" }] } )
    console.log('tx: ', tx, `http://arweave.net/${tx.id}`)
    setURI(`http://arweave.net/${tx.id}`)
  }

  async function fundWallet() {
    if (!amount) return
    const amountParsed = parseInput(amount)
    let response = await bundlrInstance.fund(amountParsed)
    console.log('Wallet funded: ', response)
    fetchBalance()
  }

  function parseInput (input) {
    const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
    if (conv.isLessThan(1)) {
      console.log('error: value too small')
      return
    } else {
      return conv
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();


    // setIpfs(ipfsInst);
    // console.log('ipfsInst:', ipfsInst);


    const form = event.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];

    const data = {
      name: "sunny"
    }
    
    // upload files
    const result = await (ipfs).add(JSON.stringify(data));
    console.log('result: ', result.path);

    // const uniquePaths = new Set([
    //   ...images.map((image) => image.path),
    //   result.path,
    // ]);
    // const uniqueImages = [...uniquePaths.values()]
    //   .map((path) => {
    //     return [
    //       ...images,
    //       {
    //         cid: result.cid,
    //         path: result.path,
    //       },
    //     ].find((image) => image.path === path);
    //   });

    //   console.log('uniqueImages: ', uniqueImages);

      // @ts-ignore
    setImages([result.path, ...images]);

    form.reset();
  };

//   console.log("images ", images);


  return (
    <div style={containerStyle}>
      {
        !balance && <button onClick={initialize}>Initialize</button>
      }
      {
        balance && (
          <div>
            <h3>Balance: {balance}</h3>
            <div style={{ padding: '20px 0px'}}>
              <input onChange={e => setAmount(e.target.value)} />
              <button onClick={fundWallet}>Fund Wallet</button>
            </div>
            <input
              type="file"
              onChange={onFileChange}
            />
            <button onClick={uploadFile}>Upload File</button>
            <button onClick={uploadText}>Upload Text</button>
            {
              image && <img src={image} style={{ width: '200px' }} />
            }
            {
              URI && <a href={URI}>{URI}</a>
            }
          </div>
        )
      }

        {/* {ipfs && ( */}
          <>
            <p>Upload File using IPFS</p>

            <form onSubmit={onSubmitHandler}>
              <input name="file" type="file" />

              <button type="submit">Upload File on IPFS</button>
            </form>

            <div>
              {images.map((image, index) => (
                <img
                  alt={`Uploaded #${image}`}
                  src={"https://ipfs.io/ipfs/"+image}
                  style={{ maxWidth:"400px", margin: "15px", backgroundColor:"black" }}
                  key={image+index}
                />
              ))}
            </div>
          </>
        {/* )} */}

        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
    </div>
  )
}

const containerStyle = {
  padding: '100px 20px'
}