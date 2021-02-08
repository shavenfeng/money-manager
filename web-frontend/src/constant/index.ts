import turnoverIcon from '@static/turnover.png'
import activedTurnoverIcon from '@static/turnover-active.png'
import statisticIcon from '@static/statistic.png'
import activedStatisticIcon from '@static/statistic-active.png'
import addIcon from '@static/add.png'
import activedAddIcon from '@static/add-active.png'
import communityIcon from '@static/community.png'
import activedCommunityIcon from '@static/community-active.png'
import mineIcon from '@static/mine.png'
import activedmineIcon from '@static/mine-active.png'

export interface SuccessfulResponse {
  code: number,
  data?: {},
  msg?: string
}

export const TAB_List = [
  {
    title: '流水',
    value: 1,
    selected: true,
    path: '/',
    icon: turnoverIcon,
    selectedIcon: activedTurnoverIcon
  },
  {
    title: '统计',
    value: 2,
    selected: false,
    path: '/statistic',
    icon: statisticIcon,
    selectedIcon: activedStatisticIcon,
  },
  // {
  //   title: '记账',
  //   value: 0,
  //   selected: false,
  //   path: '/add',
  //   icon: activedAddIcon,
  //   selectedIcon: activedAddIcon,
  // },
  // {
  //   title: '瞬间',
  //   value: 3,
  //   selected: false,
  //   path: '/moments',
  //   icon: communityIcon,
  //   selectedIcon: activedCommunityIcon,
  // },
  {
    title: '我的',
    value: 4,
    selected: false,
    path: '/mine',
    icon: mineIcon,
    selectedIcon: activedmineIcon,
  },
];
