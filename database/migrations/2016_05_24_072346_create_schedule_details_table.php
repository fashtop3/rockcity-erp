<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_details', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('schedule_id')->unsigned();
            $table->integer('schedule_sub_id')->unsigned();

            $table->integer('broadcast')->nullable();
            $table->timestamp('bulk_start_date')->nullable();
            $table->timestamp('bulk_end_date')->nullable();
            $table->decimal('amount', 12, 2);
            $table->string('duration')->nullable();
            $table->string('period');
            $table->integer('subCharge')->nullable();
            $table->decimal('subChargePrice')->nullable();


            $table->boolean('fixedSpot')->default(false);
            $table->timestamp('trans_date')->nullable();
            $table->smallInteger('hour')->nullable();
            $table->smallInteger('min')->nullable();
            $table->smallInteger('sec')->nullable();
            $table->timestamps();

            $table->foreign('schedule_sub_id')->references('id')->on('schedule_subs')->onDelete('cascade');
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
        Schema::drop('schedule_details');
    }
}
