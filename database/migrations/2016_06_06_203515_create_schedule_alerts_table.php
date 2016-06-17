<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleAlertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_alerts', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('schedule_id')->unsigned();
            $table->foreign('schedule_id')->references('id')->on('schedules')
                ->onDelete('cascade');


            $table->boolean('approved')->default(0);
            $table->integer('approved_by')->unsigned()->nullable();
            $table->foreign('approved_by')->references('id')->on('users');
            $table->timestamp('approved_signed')->nullable();

            $table->boolean('validate')->default(0);
            $table->integer('validated_by')->unsigned()->nullable();
            $table->foreign('validated_by')->references('id')->on('users');
            $table->timestamp('validate_signed')->nullable();

            $table->boolean('recommend')->default(0);
            $table->integer('recommended_by')->unsigned()->nullable();
            $table->foreign('recommended_by')->references('id')->on('users');
            $table->timestamp('recommend_signed')->nullable();

            $table->boolean('programme')->default(0);
            $table->integer('programmed_by')->unsigned()->nullable();
            $table->foreign('programmed_by')->references('id')->on('users');
            $table->timestamp('programme_signed')->nullable();

            $table->integer('mail');

            $table->timestamp('sent_at')->nullable();
            $table->timestamp('resend_at')->nullable();

            $table->string('token')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('schedule_alerts');
    }
}
