import { useEffect, useState } from 'react'

export const useScrollBarToBottomHook = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScroll, 500))
    return () => {
      window.removeEventListener('scorll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    //滚动条到底部的条件
    if (scrollTop + windowHeight == scrollHeight) {
      //写后台加载数据的函数
      callback()
    }
  }

  const throttle = (fn: () => void, delay: number) => {
    let valid = true
    return function () {
      if (!valid) {
        return false
      }
      valid = false
      setTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
  }
}
