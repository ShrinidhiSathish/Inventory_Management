'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button, style} from '@mui/material'
import { collection, getDocs, query, deleteDoc, doc, setDoc, getDoc} from "firebase/firestore";
import { blueGrey } from "@mui/material/colors";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  useEffect(() => {
    updateInventory()
  }, [])
  return (
  <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={2}
    bgcolor={'#f6a5c0'}
  >
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box 
        position = "absolute"
        top = "50%"
        left = "50%"
        width = {400}
        bgcolor= "pink"
        border= "2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{transform: 'translate(-50%,-50%)'}}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" onClick={handleOpen}>
      Add New Item
    </Button>
    <Box border={'1px solid #333'}>
      <Box
        width="800px"
        height="150px"
        bgcolor={'#f06292'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Inventory Items
        </Typography>
      </Box>
      <Box
        width="100%"
        minHeight="50px"
        display={'flex'}
        alignItems={'center'}
        bgcolor={'#f381a7'}
        paddingX={5}
      >
        <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
          Item Name and Quantity
        </Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={1} overflow={'auto'}>
        
        {inventory.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="100px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#ff99bb'}
            paddingX={5}
          >
            <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={() => addItem(name)}>
                Add
              </Button>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  </Box>
  )
}
