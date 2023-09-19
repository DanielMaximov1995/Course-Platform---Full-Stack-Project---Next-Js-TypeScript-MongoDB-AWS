import Image from 'next/image'
import HorizontalForm from "@/components/Home Page/Horizontal Form";

export default function Home() {
      const h1Title = 'קורס עריכת וידאו בכדורגל'
      const h2Title = 'קורס עריכת וידאו בכדורגל'
      const subTitle = 'בואו ללמוד איך לערוך וידאו בתוכנת Adobe Premiere'

  return (
      <main>
          <section className='flex w-[90%] mx-auto h-[800px] py-32 items-center'>
                  <div>
                      <h1 className='h2 border-r-[4px] border-accent px-6 rounded-xl text-accent'>{h1Title}</h1>
                      <p className='h5 text-accent mr-6'>{subTitle}</p>
                      <p className='pl-48 py-2 text-[18px] mr-6'>קורס המקיף והאיכותי ביותר לעריכת וידאו בכדורגל בתוכנת Adobe Premiere. נצלו את הזמן כבר עכשיו כדי ללמוד עריכת וידאו בכודרגל אצלנו שלב אחר שלב , ללא שום צורך בניסיון קודם בעריכת וידאו.</p>
                  </div>
                  <div className='relative  w-full h-full'>
                      <Image src='/13038.png' width={0} height={0} alt=''  className='object-contain w-full rounded-[24px]' sizes='100vw' quality={100}/>
                  </div>
          </section>
          <section className='dark:bg-[#222B45] bg-accentBg/5 w-full h-[800px] py-32 flex flex-wrap items-center'>
              <div className='w-full '>
                  <div className='flex w-[80%] justify-between gap-x-20 mx-auto items-center'>
                      <Image src='/Analyse-comp.jpg' width={0} height={0} alt=''  className='object-contain w-full opacity-70 hover:opacity-100 transition-all duration-300 rounded-[24px]' sizes='100vw' quality={100}/>
                      <div>
                          <h2 className='h2 border-r-[4px] border-accent px-6 rounded-xl text-accent'>קורס דיגיטלי</h2>
                          <p className='h5 text-accent mr-6'>ללמוד בצורה הנוחה ביותר</p>
                          <p className='pl-48 py-2 text-[18px] mr-6'>הקורס מתנהל באונליין לאחר רכישת הקורס תקבלו פרטי התחברות לאתר ותהיה לכם גישה לתכני הקורס בכל זמן שתרצו. אתם סיימתם את הקורס? עבר זמן ורוצים לרענן את זיכרונכם? הקורס פתוח בשבילכם תמיד!</p>
                      </div>
                  </div>
              </div>
              <div className='w-[90%] mx-auto'>
                <HorizontalForm/>
              </div>
          </section>
      </main>
  )
}
