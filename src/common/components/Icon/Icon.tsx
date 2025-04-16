import IconsSprite from '../../../assets/images/icons-sprite.svg'

type IconProps = {
  iconId: string
  width?: number
  height?: number
  viewBox?: string
  link?: string
}
export const Icon = ({iconId, height, viewBox, width}: IconProps) => {
  return (
      <svg   width={width||'20'} height={height||'20'} viewBox={viewBox|| '0 0 20 20'} fill="none" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`${IconsSprite}#${iconId}`}/>
      </svg>

  );
};


