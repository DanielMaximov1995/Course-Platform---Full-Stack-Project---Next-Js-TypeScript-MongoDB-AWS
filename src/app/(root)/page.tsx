import Image from 'next/image'
import HorizontalForm from "@/components/Home Page/Horizontal Form";
import {HomePageType} from "@/types/Home Page";
import AuthError from "@/components/Home Page/AuthError";
import AccountIcon from "@/components/Icons/Account Icon";

export default function Home({searchParams} : HomePageType) {
      const h1Title = 'קורס עריכת וידאו בכדורגל'
      const subTitle = 'בואו ללמוד איך לערוך וידאו בתוכנת Adobe Premiere'

  return (
      <main>
          {searchParams && <AuthError searchParams={searchParams}/>}
          <section className='flex flex-wrap md:flex-nowrap w-[90%] mx-auto h-[800px] py-32 items-center'>
                  <div>
                      <h1 className='h2 border-r-[4px] border-accentBg dark:border-accent px-6 rounded-xl text-accentBg dark:text-accent'>{h1Title}</h1>
                      <p className='h5 text-accentBg dark:text-accent mr-6'>{subTitle}</p>
                      <p className='md:pl-48 py-2 text-[18px] mr-6'>קורס המקיף והאיכותי ביותר לעריכת וידאו בכדורגל בתוכנת Adobe Premiere. נצלו את הזמן כבר עכשיו כדי ללמוד עריכת וידאו בכודרגל אצלנו שלב אחר שלב , ללא שום צורך בניסיון קודם בעריכת וידאו.</p>
                  </div>
                  <div className='relative  w-full h-full'>
                      <Image src='/13038.png' width={0} height={0} alt=''  className='object-contain w-full rounded-[24px]' sizes='100vw' quality={100}/>
                  </div>
          </section>
          <section className='dark:bg-[#222B45] bg-accentBg/5 w-full h-auto py-20 flex flex-wrap items-center'>
              <div className='w-full'>
                  <div className='flex flex-wrap md:flex-nowrap w-[80%] justify-between md:gap-x-20 mx-auto items-center'>
                        <div className='w-1/2'>
                            <Image src='/Analyse-comp.jpg' width={0} height={0} alt=''  className='object-contain hidden md:block w-full opacity-70 hover:opacity-100 transition-all duration-300 rounded-[24px]' sizes='100vw' quality={100}/>
                        </div>
                      <div className='w-full md:w-1/2'>
                          <h2 className='h2 border-r-[4px] border-accentBg dark:border-accent px-6 rounded-xl text-accentBg dark:text-accent'>קורס דיגיטלי</h2>
                          <p className='h5 text-accentBg dark:text-accent mr-6'>ללמוד בצורה הנוחה ביותר</p>
                          <p className='md:pl-48 py-2 text-[18px] mr-6'>הקורס מתנהל באונליין לאחר רכישת הקורס תקבלו פרטי התחברות לאתר ותהיה לכם גישה לתכני הקורס בכל זמן שתרצו. אתם סיימתם את הקורס? עבר זמן ורוצים לרענן את זיכרונכם? הקורס פתוח בשבילכם תמיד!</p>
                      <Image src='/Analyse-comp.jpg' width={0} height={0} alt=''  className='object-contain block md:hidden w-full opacity-70 hover:opacity-100 transition-all duration-300 rounded-[24px]' sizes='100vw' quality={100}/>
                      </div>
                  </div>
              </div>
              <div className='w-full mx-auto w-[70%]'>
                <HorizontalForm/>
              </div>
          </section>
          <section className='w-[80%] mx-auto py-20 '>
              <h3 className='h2 md:pb-14 text-center text-accentBg dark:text-accent'>למי הקורס מתאים?</h3>
              <div className="max-w-sm rounded-xl bg-accentBg dark:bg-accentSec overflow-hidden shadow-lg">
                        <Image src='/coaches.webp' width={0} height={0} alt=''  className='object-contain w-full ' sizes='100vw' quality={100}/>
                      <div className="px-6 py-4">
                          <div className="font-bold text-accent dark:text-accent text-xl mb-2">The Coldest Sunset</div>
                          <p className="text-accentSec dark:text-accentBg">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
                              Maiores et perferendis eaque, exercitationem praesentium nihil.
                          </p>
                      </div>
              </div>
          </section>
          <section className='dark:bg-[#222B45] bg-accentBg/5 w-full h-auto py-20 flex flex-wrap items-center'>
              <div className='w-full'>
                  <h4 className='h2 md:pb-14 text-center text-accentBg dark:text-accent' id='מה_מקבלים?'>מה מקבלים?</h4>
                  <div className='flex w-[90%] md:w-[80%] flex-wrap justify-between gap-x-20 mx-auto items-center'>
                      <div className='flex flex-wrap w-full md:w-1/2'>
                          <div className='w-1/2 p-2'>
                              <div className='bg-accentBg dark:bg-accentSec p-6 rounded-xl'>
                                  <span className='flex justify-center dark:text-accentBg text-accent '><AccountIcon fontSize={80}/></span>
                                  <p className='text-center text-accent dark:text-accentBg text-[22px]'>example</p>
                                  <p className='text-center text-accentSec dark:text-accentBg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              </div>
                          </div>
                          <div className='w-1/2 p-2'>
                              <div className='bg-accentBg dark:bg-accentSec p-6 rounded-xl'>
                                  <span className='flex justify-center dark:text-accentBg text-accent '><AccountIcon fontSize={80}/></span>
                                  <p className='text-center text-accent dark:text-accentBg text-[22px]'>example</p>
                                  <p className='text-center text-accentSec dark:text-accentBg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              </div>
                          </div>
                          <div className='w-1/2 p-2'>
                              <div className='bg-accentBg dark:bg-accentSec p-6 rounded-xl'>
                                  <span className='flex justify-center dark:text-accentBg text-accent '><AccountIcon fontSize={80}/></span>
                                  <p className='text-center text-accent dark:text-accentBg text-[22px]'>example</p>
                                  <p className='text-center text-accentSec dark:text-accentBg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              </div>
                          </div>
                          <div className='w-1/2 p-2'>
                              <div className='bg-accentBg dark:bg-accentSec p-6 rounded-xl'>
                                  <span className='flex justify-center dark:text-accentBg text-accent '><AccountIcon fontSize={80}/></span>
                                  <p className='text-center text-accent dark:text-accentBg text-[22px]'>example</p>
                                  <p className='text-center text-accentSec dark:text-accentBg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              </div>
                          </div>
                      </div>
                      <div className='flex w-[90%] md:w-[40%] md:justify-end mx-auto'>
                          <div className="max-w-sm rounded-xl bg-accentBg dark:bg-accentSec overflow-hidden shadow-lg">
                              <Image src='/coaches.webp' width={0} height={0} alt=''  className='object-contain w-full ' sizes='100vw' quality={100}/>
                              <div className="px-6 py-4">
                                  <div className="font-bold text-accent dark:text-accentBg text-xl mb-2 text-center">The Coldest Sunset</div>
                                  <p className="text-accentSec dark:text-accentBg text-center">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
                                      Maiores et perferendis eaque, exercitationem praesentium nihil.
                                  </p>
                                  <button className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 w-full h-full py-2 text-[22px]'>השאירו פרטים להרשמה</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

      </main>
  )
}
