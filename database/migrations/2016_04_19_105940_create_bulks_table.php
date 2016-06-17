<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBulksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bulks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('schedule_id')->unsigned();
            $table->integer('broadcast')->unsigned();
            $table->date('startdate');
            $table->time('starttime');
            $table->date('enddate');
            $table->time('endtime');
            $table->timestamps();

            $table->foreign('schedule_id')->references('id')->on('schedules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('bulks', function(Blueprint $table) {
//            $table->dropForeign('bulks_schedule_id_foreign');
//        });
        Schema::drop('bulks');
    }
}
