import React from 'react'
import Image from 'next/image'

type Props = {
  dbms: string;
  ImgClass: string;
}

export default function DbmsLogo({ dbms, ImgClass }: Props) {
  switch (dbms.toUpperCase()) {
    case 'MYSQL':
      return <Image width={0} height={0} priority className={`${ImgClass}`}
        src={'/mysql_logo.svg'} alt="" />
    case 'MARIADB':
      return <Image width={0} height={0} priority className={`${ImgClass}`}
        src={'/mariadb_logo.svg'} alt="" />
    case 'POSTGRESQL':
      return <Image width={0} height={0} priority className={`${ImgClass}`}
        src={'/postgresql_logo.svg'} alt="" />
    default:
      return <Image width={0} height={0} priority className={`${ImgClass}`}
        src={'/admin_profile.svg'} alt="" />
  }
}