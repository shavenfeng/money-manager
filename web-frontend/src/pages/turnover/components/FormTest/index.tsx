import React, { useRef, useEffect, useState } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import XLSX from 'xlsx'
import { uploadFormData } from '../../../../service/api'

const FormTest: React.FC = () => {
  const inputBoxRef = useRef()
  const [formData, setFormData] = useState({})
  const createUploadFile = () => {
    let input: HTMLInputElement = document.createElement('input')
    input.type = 'file'
    input.accept = '.xlsx, .xls, .csv, .png'
    input.style = 'position:absolute;top:0;left:4px;width:100%;height:5rem;opacity:0;z-index:10'
    console.log('inputBoxRef.current:', inputBoxRef.current)
    inputBoxRef.current.appendChild(input)
    input.addEventListener('change', event => {
      let files = event.target.files || event.dataTransfer.files
      // let fileReader = new FileReader()
      // console.log('new fileReader')
      // fileReader.readAsBinaryString(files[0])
      // fileReader.onload = (e) => {
      //   // console.log('====================================')
      //   // console.log(e.target.result)
      //   // console.log('====================================')
      //   // setFormData(e.target.result)
      //   const workbook = XLSX.read(e.target.result, { type: 'buffer', codepage: 936 })
      //   console.log('====================================')
      //   console.log(workbook)
      //   console.log('====================================')
      //   setFormData(workbook)
      // }
      let inputFormData = new FormData()

      inputFormData.append('file', files[0])
      inputFormData.append('obj', JSON.stringify({ name: 'feng' }))
      const fileName = files[0].name
      setFormData(inputFormData)
      console.log(fileName)
      console.log(inputFormData)
    })
  }
  const onClick = async () => {
    console.log('formdata:', formData)

    const res = await uploadFormData(formData)
    console.log(res)

  }
  useEffect(() => {
    createUploadFile()
  }, [])
  return <div ref={el => inputBoxRef.current = el} style={{ position: 'relative' }}>
    <WhiteSpace />
    <Button type="primary">上传</Button>
    <WhiteSpace />
    <Button type="primary" onClick={onClick}>确定</Button>
  </div>
}

export default FormTest
