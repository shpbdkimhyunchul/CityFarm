package com.app.cityfarm

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch
import org.devio.rn.splashscreen.SplashScreen

class IntroActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)


        CoroutineScope(Dispatchers.Main).launch {

            val mVaccine: Deferred<Boolean> = async(Dispatchers.IO) {
                val data = listOf(1, 2, 3, 4, 5)
                if (data.contains(2)) {
                    true
                } else false
            }

            val result = mVaccine.await()
            println("shpbd11==" + result)

            if (!result) {
                return@launch
            }

            val mAppiron: Deferred<Boolean> = async(Dispatchers.IO) {
                val data = listOf(1, 2, 3, 4, 5)
                if (data.contains(2)) {
                    true
                } else true
            }
            val result1 = mAppiron.await()

            if (!result1) {
                return@launch
            }
            println("shpbd22==" + result1)

        }

        Intent(applicationContext, MainActivity::class.java).run {
            this.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            applicationContext.startActivity(this)
            finish()
        }
    }

}
