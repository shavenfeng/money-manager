import React, { useState } from 'react'
import activedMineIcon from '@static/mine-active.png'
import mineIcon from '@static/mine.png'
import './index.scss'

export interface CategoryType {
  id: number,
  imgUrl: string,
  typeName: string
}

interface CategoryListProps {
  list: CategoryType[]
  onSelect: (item: CategoryType) => void
}

const CategoryList: React.FC<CategoryListProps> = props => {

  const { list, onSelect } = props

  const [currentTypeId, setCurrentTypeId] = useState(0)

  const selectType = (item: CategoryType) => {
    onSelect(item)
    setCurrentTypeId(item.id)
  }

  return <div className="category-box">
    {
      list.map((item, index) => {
        return <div className="category-item" key={item.id}>
          <div className="icon">
            <img src={currentTypeId === item.id ? activedMineIcon : mineIcon} onClick={() => selectType(item)} />
          </div>
          <div className="label">{item.typeName}</div>
        </div>
      })
    }
  </div>
}

export default CategoryList
