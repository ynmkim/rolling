import addBlackIcon from '../assets/icons/add-black.svg';
import addWhiteIcon from '../assets/icons/add-white.svg';
import deleteBlackIcon from '../assets/icons/delete-black.svg';
import deleteWhiteIcon from '../assets/icons/delete-white.svg';
import plusIcon from '../assets/icons/plus.svg';
import editIcon from '../assets/icons/edit.svg';
import closeIcon from '../assets/icons/close.svg';
import checkIcon from '../assets/icons/check.svg';
import shareIcon from '../assets/icons/share.svg';
import arrowUpIcon from '../assets/icons/arrow_up.svg';
import arrowDownIcon from '../assets/icons/arrow_down.svg';
import arrowLeftIcon from '../assets/icons/arrow_left.svg';
import arrowRightIcon from '../assets/icons/arrow_right.svg';

const ICONS = {
  add: {
    black: { src: addBlackIcon, alt: '이모티콘 추가하기' },
    white: { src: addWhiteIcon, alt: '이모티콘  추가하기 비활성' },
  },
  plus: { src: plusIcon, alt: '롤링페이퍼 만들기' },
  deleted: {
    black: { src: deleteBlackIcon, alt: '롤링페이퍼 삭제하기' },
    white: { src: deleteWhiteIcon, alt: '롤링페이퍼 삭제하기 비활성' },
  },
  edit: { src: editIcon, alt: '메세지 수정하기' },
  close: { src: closeIcon, alt: '닫기' },
  check: { src: checkIcon, alt: '확인' },
  share: { src: shareIcon, alt: '공유하기' },
  arrow: {
    up: { src: arrowUpIcon, alt: '메뉴 접기' },
    down: { src: arrowDownIcon, alt: '메뉴 펼치기' },
    left: { src: arrowLeftIcon, alt: '이전' },
    right: { src: arrowRightIcon, alt: '다음' },
  },
};

export default ICONS;
